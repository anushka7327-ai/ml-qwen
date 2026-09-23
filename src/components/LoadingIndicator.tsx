import { PipelineStep } from '../types';
import { Check, Loader2, Circle } from 'lucide-react';

interface Props {
  steps: PipelineStep[];
}

export default function LoadingIndicator({ steps }: Props) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Loader2 className="w-5 h-5 text-violet-400 animate-spin" />
          Analyzing Image...
        </h3>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {step.status === 'complete' && (
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                )}
                {step.status === 'processing' && (
                  <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/50 flex items-center justify-center">
                    <Loader2 className="w-3.5 h-3.5 text-violet-400 animate-spin" />
                  </div>
                )}
                {step.status === 'pending' && (
                  <div className="w-6 h-6 rounded-full bg-gray-700/50 border border-gray-600/50 flex items-center justify-center">
                    <Circle className="w-3 h-3 text-gray-500" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${
                    step.status === 'complete' ? 'text-emerald-300' :
                    step.status === 'processing' ? 'text-violet-300' :
                    'text-gray-500'
                  }`}>
                    {step.name}
                  </p>
                  {step.status === 'processing' && (
                    <span className="text-xs text-violet-400">{step.progress}%</span>
                  )}
                </div>
                <p className={`text-xs mt-0.5 ${
                  step.status === 'pending' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {step.description}
                </p>
                {step.status === 'processing' && (
                  <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full transition-all duration-300"
                      style={{ width: `${step.progress}%` }}
                    />
                  </div>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`absolute left-[calc(1.5rem-1px)] top-8 w-0.5 h-4 ${
                  step.status === 'complete' ? 'bg-emerald-500/30' : 'bg-gray-700/30'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
