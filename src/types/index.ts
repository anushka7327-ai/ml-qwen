export interface DetectedObject {
  name: string;
  confidence: number;
}

export interface RelatedInfo {
  title: string;
  description: string;
  source: string;
}

export interface AnalysisResult {
  id: string;
  imageUrl: string;
  originalFileName: string;
  extractedText: string;
  objects: DetectedObject[];
  imageDescription: string;
  summary: string;
  relatedInformation: RelatedInfo[];
  createdAt: string;
}

export interface PipelineStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'complete' | 'error';
  progress: number;
  description: string;
}
