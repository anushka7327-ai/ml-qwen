import { AnalysisResult } from '../types';

const STORAGE_KEY = 'imageinsight_history';

export function getHistory(): AnalysisResult[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(result: AnalysisResult): void {
  const history = getHistory();
  history.unshift(result);
  // Keep only last 50 entries
  if (history.length > 50) {
    history.pop();
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function deleteFromHistory(id: string): void {
  const history = getHistory();
  const filtered = history.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function getById(id: string): AnalysisResult | undefined {
  const history = getHistory();
  return history.find(item => item.id === id);
}
