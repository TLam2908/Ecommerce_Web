"use client";   

import { Card, CardContent, CardHeader, CardFooter} from '@/components/ui/card'
import AuthHeader from '@/components/auth/AuthHeader'
import BackButton from '@/components/auth/BackButton'

interface CardWrapperProps {
    label: string;
    title: string;
    backButtonHref: string;
    backButtonLabel: string;
    children: React.ReactNode;
}

const CardWrapper = ({label, title, backButtonHref, backButtonLabel, children}: CardWrapperProps) => {
    return (
      <Card className="xl:w-[500px] lg:w-[500px] md:shadow-md md:border border-none shadow-none">
          <CardHeader>
              <AuthHeader label={label} title={title} />
          </CardHeader>
          <CardContent>
              {children}
          </CardContent>
          <CardFooter>
              <BackButton label={backButtonLabel} href={backButtonHref} />
              </CardFooter>
      </Card>
    )
  }
  
export default CardWrapper;