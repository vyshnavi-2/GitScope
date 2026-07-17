import { Code2, Heart } from 'lucide-react'
import { Container } from '../common'
import {
  APP_NAME,
  APP_TAGLINE,
  CURRENT_YEAR,
  FOOTER_LINKS,
} from '../../constants'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-900">
      <Container className="py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <div className="flex items-center gap-2 text-surface-900 dark:text-surface-100">
              <Code2 className="h-5 w-5 text-accent-500" aria-hidden="true" />
              <span className="text-sm font-semibold">{APP_NAME}</span>
            </div>
            <p className="text-sm leading-relaxed text-surface-500 dark:text-surface-400">
              {APP_TAGLINE}. Built for developers who want clarity, speed, and
              insight from their GitHub activity.
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-6 gap-y-2"
            aria-label="Footer navigation"
          >
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-sm text-surface-500 transition-colors hover:text-accent-500 dark:text-surface-400 dark:hover:text-accent-400"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-surface-200 pt-6 text-sm text-surface-500 sm:flex-row sm:items-center sm:justify-between dark:border-surface-800 dark:text-surface-400">
          <p>
            &copy; {CURRENT_YEAR} {APP_NAME}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Crafted with
            <Heart
              className="h-3.5 w-3.5 fill-accent-500 text-accent-500"
              aria-hidden="true"
            />
            for developers
          </p>
        </div>
      </Container>
    </footer>
  )
}
