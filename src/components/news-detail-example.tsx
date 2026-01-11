"use client";

import { Badge } from "@/components/ui/badge";
import { Clock, Eye, User } from "lucide-react";

export function NewsDetailExample() {
  return (
    <article className="space-y-8">
      <header className="space-y-6">
        <Badge variant="secondary" className="text-sm px-3 py-1">
          Politik Internasional
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          EU Diplomat Warns Against Pressuring Ukraine to Surrender Territories
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border pb-6">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span className="font-medium">Kaja Kallas</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>15 Januari 2025</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-2" />
            <span>1,247 views</span>
          </div>
        </div>
      </header>

      <div className="news-content">
        <p>
          Top diplomat of the European Union has warned against pressuring
          Ukraine to surrender territories to Russia as part of a future peace
          agreement. The statement comes amid ongoing discussions about
          potential peace negotiations between the warring nations.
        </p>

        <p>
          Kaja Kallas, in her first UK interview since EU leaders participated
          in Donald Trump's White House peace talks with Ukraine, told the BBC's
          Today programme that allowing Russia to retain Ukrainian territories
          would be a "trap that Putin wants us to walk into."
        </p>

        <p>
          The Donbas region in eastern Ukraine has been long contested by
          Russia, with military aggression forcing{" "}
          <strong>1.5 million Ukrainians to flee</strong> over the past decade.
          This humanitarian crisis has created one of the largest displacement
          situations in recent European history.
        </p>

        <p>
          Ukraine has consistently refused to concede Donbas to the Kremlin for
          peace, despite Trump emphasizing the need for "swapping of
          territories." The Ukrainian government maintains that territorial
          integrity is non-negotiable and essential for any lasting peace
          agreement.
        </p>

        <h2>International Response</h2>

        <p>
          The international community has largely supported Ukraine's position,
          with NATO members providing military and humanitarian assistance.
          However, there are growing concerns about war fatigue and the economic
          impact of prolonged conflict.
        </p>

        <p>
          European leaders have emphasized the importance of maintaining unity
          in support of Ukraine, while also exploring diplomatic solutions that
          respect Ukrainian sovereignty and international law.
        </p>

        <h3>Economic Implications</h3>

        <p>
          The ongoing conflict has significant economic implications for both
          Ukraine and the broader European economy. Energy security, trade
          routes, and regional stability are all affected by the current
          situation.
        </p>

        <blockquote>
          "Peace cannot come at the cost of justice and territorial integrity.
          We must find solutions that respect international law and Ukrainian
          sovereignty."
        </blockquote>

        <p>
          As negotiations continue, the focus remains on finding a peaceful
          resolution that addresses the root causes of the conflict while
          ensuring long-term stability in the region.
        </p>
      </div>
    </article>
  );
}

