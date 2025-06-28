import numpy as np
from sentence_transformers import SentenceTransformer
from PIL import Image
import io
from typing import List, Optional, Tuple
import logging
import re

logger = logging.getLogger(__name__)

class PropertyAIDetector:
    def __init__(self):
        # Initialize free AI models (no API keys required)
        self.image_model = SentenceTransformer('clip-ViT-B-32')
        self.text_model = SentenceTransformer('all-MiniLM-L6-v2')
        
        # Similarity thresholds
        self.IMAGE_SIMILARITY_THRESHOLD = 0.85
        self.TEXT_SIMILARITY_THRESHOLD = 0.80
    
    def preprocess_image(self, image_data: bytes) -> np.ndarray:
        """Convert image bytes to standardized numpy array"""
        try:
            image = Image.open(io.BytesIO(image_data)).convert('RGB')
            image = image.resize((224, 224))
            return np.array(image)
        except Exception as e:
            logger.error(f"Image preprocessing failed: {e}")
            return None
    
    def generate_image_embedding(self, image_data: bytes) -> Optional[np.ndarray]:
        """Generate CLIP embedding for image"""
        processed_image = self.preprocess_image(image_data)
        if processed_image is None:
            return None
        
        try:
            embedding = self.image_model.encode([processed_image])
            return embedding[0]
        except Exception as e:
            logger.error(f"Image embedding generation failed: {e}")
            return None
    
    def clean_text(self, text: str) -> str:
        """Clean and normalize property description"""
        # Normalize whitespace and case
        text = re.sub(r'\s+', ' ', text.strip().lower())
        
        # Remove common real estate filler words
        filler_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
            'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
            'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
            'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
        }
        
        words = [word for word in text.split() if word not in filler_words]
        return ' '.join(words)
    
    def generate_text_embedding(self, text: str) -> Optional[np.ndarray]:
        """Generate semantic embedding for property description"""
        try:
            cleaned_text = self.clean_text(text)
            embedding = self.text_model.encode([cleaned_text])
            return embedding[0]
        except Exception as e:
            logger.error(f"Text embedding generation failed: {e}")
            return None
    
    def calculate_cosine_similarity(self, emb1: np.ndarray, emb2: np.ndarray) -> float:
        """Calculate cosine similarity between two embeddings"""
        try:
            dot_product = np.dot(emb1, emb2)
            norm1 = np.linalg.norm(emb1)
            norm2 = np.linalg.norm(emb2)
            
            if norm1 == 0 or norm2 == 0:
                return 0.0
            
            return float(dot_product / (norm1 * norm2))
        except Exception as e:
            logger.error(f"Similarity calculation failed: {e}")
            return 0.0
    
    def extract_property_features_rule_based(self, description: str) -> dict:
        """Extract property features using rule-based NLP (no API required)"""
        text = description.lower()
        features = {}
        
        # Extract bedrooms
        bedroom_patterns = [
            r'(\d+)\s*(?:bed|bedroom|bhk)',
            r'(\d+)bhk',
            r'(\d+)\s*br'
        ]
        for pattern in bedroom_patterns:
            match = re.search(pattern, text)
            if match:
                features['bedrooms'] = int(match.group(1))
                break
        
        # Extract bathrooms
        bathroom_patterns = [
            r'(\d+)\s*(?:bath|bathroom)',
            r'(\d+)\s*toilet'
        ]
        for pattern in bathroom_patterns:
            match = re.search(pattern, text)
            if match:
                features['bathrooms'] = int(match.group(1))
                break
        
        # Extract area
        area_patterns = [
            r'(\d+(?:\.\d+)?)\s*(?:sq\s*ft|sqft|square\s*feet)',
            r'(\d+(?:\.\d+)?)\s*(?:sq\s*m|sqm|square\s*meter)'
        ]
        for pattern in area_patterns:
            match = re.search(pattern, text)
            if match:
                area = float(match.group(1))
                # Convert sq meters to sq feet if needed
                if 'sq m' in match.group(0) or 'sqm' in match.group(0):
                    area *= 10.764
                features['area_sqft'] = int(area)
                break
        
        # Extract property type
        property_types = {
            'apartment': ['apartment', 'flat', 'unit'],
            'house': ['house', 'bungalow', 'independent'],
            'villa': ['villa', 'duplex'],
            'studio': ['studio'],
            'penthouse': ['penthouse'],
            'townhouse': ['townhouse', 'row house']
        }
        
        for prop_type, keywords in property_types.items():
            for keyword in keywords:
                if keyword in text:
                    features['property_type'] = prop_type
                    break
            if 'property_type' in features:
                break
        
        # Extract common amenities
        amenity_keywords = {
            'parking': ['parking', 'garage', 'car park'],
            'swimming_pool': ['swimming pool', 'pool'],
            'gym': ['gym', 'fitness', 'exercise'],
            'balcony': ['balcony', 'terrace'],
            'elevator': ['elevator', 'lift'],
            'security': ['security', 'guard', 'gated'],
            'garden': ['garden', 'lawn', 'landscaped'],
            'ac': ['ac', 'air condition', 'central air'],
            'furnished': ['furnished', 'fully furnished'],
            'sea_view': ['sea view', 'ocean view', 'waterfront']
        }
        
        amenities = []
        for amenity, keywords in amenity_keywords.items():
            for keyword in keywords:
                if keyword in text:
                    amenities.append(amenity)
                    break
        
        if amenities:
            features['amenities'] = amenities
        
        # Extract location keywords (areas, landmarks)
        location_patterns = [
            r'(?:in|at|near|close to)\s+([a-zA-Z\s]+?)(?:\s|,|$)',
            r'([a-zA-Z\s]+?)\s+(?:area|locality|sector|block)'
        ]
        
        location_keywords = []
        for pattern in location_patterns:
            matches = re.findall(pattern, text)
            for match in matches:
                if isinstance(match, str):
                    clean_location = match.strip()
                    if len(clean_location) > 2 and clean_location not in location_keywords:
                        location_keywords.append(clean_location)
        
        if location_keywords:
            features['location_keywords'] = location_keywords[:5]  # Limit to 5
        
        return features
    
    def compare_images(self, new_images: List[bytes], stored_embeddings: List[np.ndarray]) -> float:
        """Compare new property images with existing ones"""
        if not new_images or not stored_embeddings:
            return 0.0
        
        max_similarity = 0.0
        
        # Generate embeddings for new images
        new_embeddings = []
        for img_data in new_images:
            embedding = self.generate_image_embedding(img_data)
            if embedding is not None:
                new_embeddings.append(embedding)
        
        if not new_embeddings:
            return 0.0
        
        # Compare each new image with each stored image
        for new_emb in new_embeddings:
            for stored_emb in stored_embeddings:
                similarity = self.calculate_cosine_similarity(new_emb, stored_emb)
                max_similarity = max(max_similarity, similarity)
        
        return max_similarity
    
    def compare_descriptions(self, new_description: str, stored_embedding: np.ndarray) -> float:
        """Compare new property description with existing one"""
        new_embedding = self.generate_text_embedding(new_description)
        if new_embedding is None:
            return 0.0
        
        return self.calculate_cosine_similarity(new_embedding, stored_embedding)
    
    def compare_features(self, features1: dict, features2: dict) -> float:
        """Compare extracted property features for additional similarity check"""
        if not features1 or not features2:
            return 0.0
        
        score = 0.0
        total_checks = 0
        
        # Compare numerical features
        numerical_features = ['bedrooms', 'bathrooms', 'area_sqft']
        for feature in numerical_features:
            if feature in features1 and feature in features2:
                val1, val2 = features1[feature], features2[feature]
                if val1 == val2:
                    score += 1.0
                elif feature == 'area_sqft':
                    # Area can have some tolerance (within 10%)
                    diff_percent = abs(val1 - val2) / max(val1, val2, 1)
                    if diff_percent <= 0.1:
                        score += 0.8
                    elif diff_percent <= 0.2:
                        score += 0.5
                total_checks += 1
        
        # Compare categorical features
        if 'property_type' in features1 and 'property_type' in features2:
            if features1['property_type'] == features2['property_type']:
                score += 1.0
            total_checks += 1
        
        # Compare amenities (Jaccard similarity)
        if 'amenities' in features1 and 'amenities' in features2:
            set1 = set(features1['amenities'])
            set2 = set(features2['amenities'])
            if set1 or set2:
                jaccard = len(set1 & set2) / len(set1 | set2)
                score += jaccard
            total_checks += 1
        
        return score / max(total_checks, 1)
    
    def is_duplicate(self, 
                    image_similarity: float, 
                    text_similarity: float, 
                    feature_similarity: float,
                    location_distance_km: float,
                    location_threshold_km: float = 0.5) -> bool:
        """Determine if property is a duplicate based on AI analysis"""
        
        # Location must be within threshold
        if location_distance_km > location_threshold_km:
            return False
        
        # Multiple similarity checks with different weights
        weighted_score = (
            image_similarity * 0.4 +
            text_similarity * 0.4 +
            feature_similarity * 0.2
        )
        
        # High weighted score OR very high individual similarity indicates duplicate
        return (weighted_score >= 0.75 or 
                image_similarity >= self.IMAGE_SIMILARITY_THRESHOLD or 
                text_similarity >= self.TEXT_SIMILARITY_THRESHOLD)
    
    def analyze_property_similarity(self, 
                                  new_images: List[bytes],
                                  new_description: str,
                                  stored_data: List[dict]) -> List[dict]:
        """
        Analyze similarity between new property and stored properties
        
        stored_data format:
        [
            {
                'property_id': int,
                'image_embeddings': List[np.ndarray],
                'text_embedding': np.ndarray,
                'description': str,  # For feature extraction
                'latitude': float,
                'longitude': float
            }
        ]
        """
        results = []
        
        # Extract features from new property
        new_features = self.extract_property_features_rule_based(new_description)
        
        for stored_prop in stored_data:
            # Calculate image similarity
            image_sim = self.compare_images(
                new_images, 
                stored_prop.get('image_embeddings', [])
            )
            
            # Calculate text similarity
            text_sim = 0.0
            if stored_prop.get('text_embedding') is not None:
                text_sim = self.compare_descriptions(
                    new_description,
                    stored_prop['text_embedding']
                )
            
            # Calculate feature similarity
            stored_features = {}
            if stored_prop.get('description'):
                stored_features = self.extract_property_features_rule_based(
                    stored_prop['description']
                )
            
            feature_sim = self.compare_features(new_features, stored_features)
            
            # Calculate location distance
            location_distance = stored_prop.get('location_distance', float('inf'))
            
            # Determine if duplicate
            is_dup = self.is_duplicate(
                image_sim, text_sim, feature_sim, location_distance
            )
            
            # Calculate overall confidence score
            confidence = (image_sim * 0.4 + text_sim * 0.4 + feature_sim * 0.2)
            
            result = {
                'property_id': stored_prop['property_id'],
                'image_similarity': round(image_sim, 3),
                'text_similarity': round(text_sim, 3),
                'feature_similarity': round(feature_sim, 3),
                'location_distance': location_distance,
                'is_duplicate': is_dup,
                'confidence_score': round(confidence, 3),
                'extracted_features': new_features if is_dup else {}
            }
            
            results.append(result)
        
        # Sort by confidence score (highest first)
        results.sort(key=lambda x: x['confidence_score'], reverse=True)
        
        return results
    
    def generate_property_hash(self, images: List[bytes], description: str) -> str:
        """Generate a hash for quick duplicate detection"""
        import hashlib
        
        hasher = hashlib.md5()
        
        # Add image data (first 1KB of each image)
        for img in images:
            hasher.update(img[:1000])
        
        # Add cleaned description
        cleaned_desc = self.clean_text(description)
        hasher.update(cleaned_desc.encode('utf-8'))
        
        return hasher.hexdigest()
    
    def batch_generate_embeddings(self, 
                                 images_list: List[List[bytes]], 
                                 descriptions: List[str]) -> Tuple[List[List[np.ndarray]], List[np.ndarray]]:
        """Generate embeddings for multiple properties efficiently"""
        image_embeddings_batch = []
        text_embeddings_batch = []
        
        # Process images
        for images in images_list:
            property_image_embs = []
            for img_data in images:
                emb = self.generate_image_embedding(img_data)
                if emb is not None:
                    property_image_embs.append(emb)
            image_embeddings_batch.append(property_image_embs)
        
        # Process descriptions in batch for efficiency
        cleaned_descriptions = [self.clean_text(desc) for desc in descriptions]
        if cleaned_descriptions:
            text_embeddings = self.text_model.encode(cleaned_descriptions)
            text_embeddings_batch = list(text_embeddings)
        
        return image_embeddings_batch, text_embeddings_batch


# Utility functions for integration
def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance between two coordinates in kilometers"""
    from math import radians, cos, sin, asin, sqrt
    
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))
    
    return c * 6371  # Earth's radius in km

def embedding_to_bytes(embedding: np.ndarray) -> bytes:
    """Convert numpy embedding to bytes for database storage"""
    return embedding.astype(np.float32).tobytes()

def bytes_to_embedding(data: bytes) -> np.ndarray:
    """Convert bytes back to numpy embedding"""
    return np.frombuffer(data, dtype=np.float32)


# Example usage
if __name__ == "__main__":
    # Initialize detector (no API keys needed!)
    detector = PropertyAIDetector()
    
    # Example: Analyze similarity
    new_images = [b'image_data_1', b'image_data_2']
    new_description = "Spacious 3BHK apartment with sea view, swimming pool, parking in Bandra West. 1200 sq ft fully furnished."
    
    stored_properties = [
        {
            'property_id': 123,
            'image_embeddings': [np.random.rand(512)],  # Mock embedding
            'text_embedding': np.random.rand(384),      # Mock embedding
            'description': "3 bedroom apartment with ocean view, pool, car parking in Bandra. 1150 sqft furnished.",
            'location_distance': 0.3  # 300 meters away
        }
    ]
    
    results = detector.analyze_property_similarity(
        new_images, 
        new_description, 
        stored_properties
    )
    
    print("Similarity Analysis Results:")
    for result in results:
        print(f"Property {result['property_id']}: {result}")
    
    # Example: Extract features
    features = detector.extract_property_features_rule_based(new_description)
    print(f"\nExtracted Features: {features}")