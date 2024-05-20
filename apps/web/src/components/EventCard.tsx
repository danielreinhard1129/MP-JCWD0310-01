import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { format } from 'date-fns';
import Image from 'next/image';
import { FC } from 'react';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { Separator } from './ui/separator';

interface EventCardProps {
  title: string;
  category: string;
  imageUrl: string;
  startDate: Date;
  eventId: number;
  price: number;
  organizer: string
}

const EventCard: FC<EventCardProps> = ({
  title,
  category,
  imageUrl,
  startDate,
  eventId,
  price,
  organizer,
}) => {
  return (
    <Link href={`/events/${eventId}`}>
      <Card className='rounded-md h-[415px]'>
        <CardHeader className="relative h-[180px] w-full overflow-hidden">
          <>
            <Image
              src={imageUrl}
              alt="Thumbnail"
              className=" object-cover h-[150px] rounded-t-md"
              fill
            />
          </>
        </CardHeader>
        <CardContent>
          <h2 className="line-clamp-2 text-md font-semibold">{title}</h2>
          <Badge className="rounded-sm text-sm text-slate-700 bg-marine-200 my-3">
            {category}
          </Badge>
          <p className="text-sm font-light mb-2">
            {format(startDate, 'dd MMMM yyyy')}
          </p>
          <p className='text-md font-semibold mb-5'>{price === 0 ? 'Free' : `Rp.${price}`}</p>
          <Separator/>
          <p className="mt-4 ">{organizer}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
