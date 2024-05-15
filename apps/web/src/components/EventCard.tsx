import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { format } from 'date-fns';
import Image from 'next/image';
import { FC } from 'react';
import { Badge } from './ui/badge';
import Link from 'next/link';

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
    <Link href={`/${eventId}`}>
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
          <Badge variant="outline" className="rounded-sm bg-green-100">
            {category}
          </Badge>
          <h2 className="line-clamp-2 text-lg font-semibold">{title}</h2>
          <p className="text-sm font-light italic">
            {format(startDate, 'dd MMMM yyyy')} - {price}
          </p>
          <p className="line-clamp-3 ">{category}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
