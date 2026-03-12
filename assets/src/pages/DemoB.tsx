import { Head, Link } from '@inertiajs/react'
import { ArrowLeft, CheckCircle2, Server } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Props {
  message?: string
  timestamp?: string
}

export default function DemoB({ message, timestamp }: Props) {
  return (
    <>
      <Head title="Demo B" />
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Navigation successful
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Demo Page B
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              You navigated here from Demo A via Inertia.js client-side routing.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Server-Provided Props
              </CardTitle>
              <CardDescription>
                Data passed from the Phoenix controller to this React component
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-zinc-100 dark:bg-zinc-900 p-4 font-mono text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">message:</span>
                  <span className="text-zinc-900 dark:text-zinc-50">
                    &quot;
                    {message ?? 'Hello from Phoenix!'}
                    &quot;
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-400">timestamp:</span>
                  <span className="text-zinc-600 dark:text-zinc-300">
                    {timestamp ?? '—'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                These values were assigned as props by the Phoenix controller using
                {' '}
                <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-xs font-mono">
                  assign_prop/3
                </code>
                {' '}
                from
                {' '}
                <code className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-xs font-mono">
                  Inertia.Controller
                </code>
                .
              </p>
            </CardContent>
            <CardFooter className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
              <Link href="/demo/a" className="w-full">
                <Button variant="outline" className="w-full group">
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Demo Page A
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <p className="text-center text-xs text-zinc-400 dark:text-zinc-600">
            Navigate back — Inertia preserves scroll position and handles history
          </p>
        </div>
      </div>
    </>
  )
}
