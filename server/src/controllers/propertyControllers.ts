import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { S3Client } from "@aws-sdk/client-s3";
import { Location } from "@prisma/client";
import { Upload } from "@aws-sdk/lib-storage";
import axios from "axios";

const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
});

// ✅ 1. Get recommended properties (based on price & type, not location)
export const getRecommendedProperties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const propertyId = Number(id);

    const currentProperty = await prisma.property.findUnique({
      where: { id: propertyId },
      include: { location: true },
    });

    if (!currentProperty) {
      res.status(404).json({ message: "Property not found" });
      return;
    }

    const priceLower = currentProperty.pricePerMonth * 0.8;
    const priceUpper = currentProperty.pricePerMonth * 1.2;

    const recommendations = await prisma.property.findMany({
      where: {
        id: { not: propertyId },
        propertyType: currentProperty.propertyType,
        pricePerMonth: { gte: priceLower, lte: priceUpper },
      },
      include: {
        location: true,
      },
      take: 5,
    });

    res.json(recommendations);
  } catch (error: any) {
    console.error("Recommendation error:", error);
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

// ✅ 2. Get all properties (filtered)
export const getProperties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      favoriteIds,
      priceMin,
      priceMax,
      beds,
      baths,
      propertyType,
      squareFeetMin,
      squareFeetMax,
      amenities,
      availableFrom,
    } = req.query;

    const filters: any = {};

    if (favoriteIds) {
      const ids = (favoriteIds as string).split(",").map(Number);
      filters.id = { in: ids };
    }
    if (priceMin) filters.pricePerMonth = { ...filters.pricePerMonth, gte: Number(priceMin) };
    if (priceMax) filters.pricePerMonth = { ...filters.pricePerMonth, lte: Number(priceMax) };
    if (beds && beds !== "any") filters.beds = { gte: Number(beds) };
    if (baths && baths !== "any") filters.baths = { gte: Number(baths) };
    if (squareFeetMin) filters.squareFeet = { ...filters.squareFeet, gte: Number(squareFeetMin) };
    if (squareFeetMax) filters.squareFeet = { ...filters.squareFeet, lte: Number(squareFeetMax) };
    if (propertyType && propertyType !== "any") filters.propertyType = propertyType;

    const properties = await prisma.property.findMany({
      where: filters,
      include: {
        location: true,
      },
    });

    res.json(properties);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving properties: ${error.message}` });
  }
};

// ✅ 3. Get one property
export const getProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({
      where: { id: Number(id) },
      include: {
        location: true,
      },
    });

    res.json(property || {});
  } catch (err: any) {
    res.status(500).json({ message: `Error retrieving property: ${err.message}` });
  }
};

// ✅ 4. Create property
export const createProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];
    const {
      address,
      city,
      state,
      country,
      postalCode,
      managerCognitoId,
      ...propertyData
    } = req.body;

    const photoUrls = await Promise.all(
      files.map(async (file) => {
        const uploadParams = {
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: `properties/${Date.now()}-${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        const uploadResult = await new Upload({
          client: s3Client,
          params: uploadParams,
        }).done();

        return uploadResult.Location;
      })
    );

    const geocodingUrl = `https://nominatim.openstreetmap.org/search?${new URLSearchParams(
      {
        street: address,
        city,
        country,
        postalcode: postalCode,
        format: "json",
        limit: "1",
      }
    ).toString()}`;

    const geocodingResponse = await axios.get(geocodingUrl, {
      headers: {
        "User-Agent": "RealEstateApp (justsomedummyemail@gmail.com",
      },
    });

    const [longitude, latitude] =
      geocodingResponse.data[0]?.lon && geocodingResponse.data[0]?.lat
        ? [parseFloat(geocodingResponse.data[0].lon), parseFloat(geocodingResponse.data[0].lat)]
        : [0, 0];

    const location = await prisma.location.create({
      data: {
        address,
        city,
        state,
        country,
        postalCode,
        latitude,
        longitude,
      },
    });

    const newProperty = await prisma.property.create({
      data: {
        ...propertyData,
        photoUrls,
        locationId: location.id,
        managerCognitoId,
        amenities:
          typeof propertyData.amenities === "string"
            ? propertyData.amenities.split(",")
            : [],
        highlights:
          typeof propertyData.highlights === "string"
            ? propertyData.highlights.split(",")
            : [],
        isPetsAllowed: propertyData.isPetsAllowed === "true",
        isParkingIncluded: propertyData.isParkingIncluded === "true",
        pricePerMonth: parseFloat(propertyData.pricePerMonth),
        securityDeposit: parseFloat(propertyData.securityDeposit),
        applicationFee: parseFloat(propertyData.applicationFee),
        beds: parseInt(propertyData.beds),
        baths: parseFloat(propertyData.baths),
        squareFeet: parseInt(propertyData.squareFeet),
      },
      include: {
        location: true,
        manager: true,
      },
    });

    res.status(201).json(newProperty);
  } catch (err: any) {
    res.status(500).json({ message: `Error creating property: ${err.message}` });
  }
};
