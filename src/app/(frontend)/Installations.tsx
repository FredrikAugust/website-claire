import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Media } from '@/payload-types'
import configPromise from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Paperclip } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

export async function Installations() {
  const payload = await getPayload({
    config: configPromise,
  })

  const installations = await payload.find({
    collection: 'installations',
    sort: 'index',
  })

  return (
    <div className="flex flex-col gap-4">
      {installations.docs.map((installation) => {
        return (
          <Card key={installation.title}>
            <CardHeader>
              <CardTitle className="font-sans">{installation.title}</CardTitle>
              <CardDescription>{installation.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <RichText
                className="font-serif [&_a]:underline text-justify"
                data={installation.summary}
              />
            </CardContent>
            {installation.files && installation.files.length > 0 && (
              <CardFooter className="flex flex-col gap-2 items-start">
                <p className="text-sm text-muted-foreground">Additional resources</p>
                <div className="flex gap-2">
                  {installation.files.map((file) => {
                    const f = file.file as Media
                    return (
                      <Button asChild size="sm" variant="outline" key={file.title}>
                        <Link href={f.url!} target="_blank" rel="noreferer">
                          <Paperclip />
                          {file.title}
                        </Link>
                      </Button>
                    )
                  })}
                </div>
              </CardFooter>
            )}
          </Card>
        )
      })}
    </div>
  )
}
