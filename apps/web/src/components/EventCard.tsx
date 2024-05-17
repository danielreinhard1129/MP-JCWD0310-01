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
}

const EventCard: FC<EventCardProps> = ({
  title,
  category,
  imageUrl,
  startDate,
  eventId,
  price,
}) => {
  return (
    <Link href={`/events/${eventId}`}>

      <Card>
        <CardHeader>
          <div className="relative h-[220px] w-full overflow-hidden rounded-md">
            <Image
              src={imageUrl}
              alt="Thumbnail"
              className="object-cover"
              fill
            />
          </div>
        </CardHeader>
        <CardContent>
          <h2 className="line-clamp-2 text-lg font-semibold">{title}</h2>
          <Badge variant="outline" className="rounded-sm bg-marine-200 mb-5">
            {category}
          </Badge>
          <p className="text-sm font-light italic mb-2">
            {format(startDate, 'dd MMMM yyyy')} - {price === 0 ? 'Free' : `Rp.$${price}`}
          </p>
          <Separator/>
          <p className="line-clamp-3 ">{category}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
