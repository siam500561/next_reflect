import { BarChart3, LineChart } from "lucide-react";

export function MoodAnalytics() {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      <div className="relative rounded-lg border bg-white">
        <div className="flex items-center gap-2 border-b border-orange-200 p-2 bg-orange-50">
          <div className="flex items-center gap-2">
            <BarChart3 className="size-4 text-orange-700" />
            <span className="text-sm font-medium text-orange-700">
              Mood Trends
            </span>
          </div>
          <div className="ml-auto flex gap-1">
            <div className="size-2 rounded-full bg-orange-200" />
            <div className="size-2 rounded-full bg-orange-300" />
            <div className="size-2 rounded-full bg-orange-400" />
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {/* Chart Preview */}
            <div className="h-48 w-full bg-gradient-to-b from-orange-100/50 to-transparent rounded-lg relative overflow-hidden">
              {/* Line Chart Path */}
              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path
                  d="M0,50 C25,40 35,60 50,45 C65,30 75,55 100,40"
                  className="stroke-orange-500 stroke-2 fill-none animate-draw-line"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    strokeDasharray: 1000,
                    strokeDashoffset: 1000,
                    animation: "draw-line 2s ease-out forwards",
                  }}
                />
                {/* Area under the line */}
                <path
                  d="M0,50 C25,40 35,60 50,45 C65,30 75,55 100,40 L100,100 L0,100 Z"
                  className="fill-orange-500/10 animate-fade-in"
                  style={{
                    animation: "fade-in 1s ease-out forwards",
                  }}
                />
              </svg>
              {/* Data Points */}
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <div className="size-3 rounded-full bg-orange-500 ring-4 ring-orange-100 animate-pulse" />
                <div className="size-3 rounded-full bg-orange-500 ring-4 ring-orange-100 animate-pulse [animation-delay:200ms]" />
                <div className="size-3 rounded-full bg-orange-500 ring-4 ring-orange-100 animate-pulse [animation-delay:400ms]" />
                <div className="size-3 rounded-full bg-orange-500 ring-4 ring-orange-100 animate-pulse [animation-delay:600ms]" />
                <div className="size-3 rounded-full bg-orange-500 ring-4 ring-orange-100 animate-pulse [animation-delay:800ms]" />
              </div>
            </div>
            {/* Stats Preview */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-orange-50 p-3">
                <div className="text-xs text-orange-600 mb-1">Average Mood</div>
                <div className="text-lg font-semibold text-orange-700">7.5</div>
              </div>
              <div className="rounded-lg bg-orange-50 p-3">
                <div className="text-xs text-orange-600 mb-1">Entries</div>
                <div className="text-lg font-semibold text-orange-700">28</div>
              </div>
              <div className="rounded-lg bg-orange-50 p-3">
                <div className="text-xs text-orange-600 mb-1">Streak</div>
                <div className="text-lg font-semibold text-orange-700">12</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="size-12 bg-orange-100 rounded-full flex items-center justify-center">
          <LineChart className="size-6 text-orange-600" />
        </div>
        <h3 className="text-2xl font-bold text-orange-900">Mood Analytics</h3>
        <p className="text-orange-700">
          Track and visualize your emotional journey with:
        </p>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center gap-2">
            <div className="size-2 bg-orange-600 rounded-full" />
            Interactive mood tracking charts
          </li>
          <li className="flex items-center gap-2">
            <div className="size-2 bg-orange-600 rounded-full" />
            Personalized insights and patterns
          </li>
        </ul>
      </div>
    </div>
  );
}
