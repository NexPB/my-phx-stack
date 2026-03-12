import { Head, Link } from '@inertiajs/react'
import { ArrowRight, Layers, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function DemoA() {
  return (
    <>
      <Head title="Demo A" />
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900/10 px-4 py-1.5 text-sm font-medium text-zinc-900 dark:bg-zinc-50/10 dark:text-zinc-50">
              <Zap className="h-3.5 w-3.5" />
              Vite + Inertia + shadcn/ui
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Demo Page A
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              This page is rendered by React via Inertia.js, served by Phoenix.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Stack Overview
              </CardTitle>
              <CardDescription>
                The technology powering this page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  {
                    label: 'Phoenix',
                    desc: 'Handles routing and serves the initial HTML',
                  },
                  {
                    label: 'Inertia.js',
                    desc: 'Bridges Phoenix controllers with React components',
                  },
                  {
                    label: 'React',
                    desc: 'Renders interactive UI on the client',
                  },
                  {
                    label: 'Vite',
                    desc: 'Bundles and serves assets with HMR in dev',
                  },
                  {
                    label: 'shadcn/ui',
                    desc: 'Copy-paste UI components with Tailwind',
                  },
                ].map(({ label, desc }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="mt-0.5 h-5 w-5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                      <span className="h-2 w-2 rounded-full bg-zinc-900 dark:bg-zinc-50" />
                    </span>
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      <strong>{label}</strong>
                      {' '}
                      —
                      {desc}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
              <Link href="/demo/b" className="w-full">
                <Button className="w-full group">
                  Go to Demo Page B
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <p className="text-center text-xs text-zinc-400 dark:text-zinc-600">
            Navigation is handled client-side by Inertia.js — no full page reload
          </p>
        </div>
      </div>
    </>
  )
}
