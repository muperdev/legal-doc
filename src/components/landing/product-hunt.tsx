'use client'

import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export function ProductHunt() {
  return (
    <section className="mx-auto px-4 md:py-24 w-full">
      <div className="flex flex-col items-center justify-center text-center space-y-4 w-full">
        <Card className="max-w-3xl mx-auto bg-black border-none w-full">
          <CardContent className="pt-12 pb-8 px-8 w-full ">
            <blockquote className="relative w-full">
              <h2 className="text-3xl md:text-5xl font-medium text-gray-100 mb-8 font-blackHanSans">
                You can vote us on{' '}
                <span className="text-primary">Product Hunt</span>
                <br />I mean if you want to
              </h2>
              <div className="flex items-center justify-center space-x-3 w-full">
                <a
                  href="https://www.producthunt.com/posts/gimme-doc?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-gimme&#0045;doc"
                  target="_blank"
                >
                  <Image
                    src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=801817&theme=light&t=1737719989724"
                    alt="Gimme&#0032;Doc - Create&#0032;legal&#0032;docs&#0032;in&#0032;seconds | Product Hunt"
                    style={{ width: '250px', height: '54px' }}
                    width="250"
                    height="54"
                  />
                </a>
                <div className="text-gray-300">Featured on Product Hunt</div>
              </div>
            </blockquote>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
