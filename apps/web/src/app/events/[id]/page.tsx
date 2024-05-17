"use client";

import { Separator } from "@/components/ui/separator";
import useGetEvent from "@/hooks/api/admin/useGetEvent";
import { appConfig } from "@/utils/config";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const EventDetail = ({params}:{params: {id: string}}) => {
    const { event, isLoading } = useGetEvent(Number(params.id))

    if(isLoading) {
        return( 
        <div className='container mx-auto px-4'>
          {/* <SkeletonBlogDetail/>; */}
        </div>
        )
      }


    if(!event){
        return notFound();
    }
  return (
    <main className="container mx-auto px-4">
      <section className="mb-4 lg:mx-12 mt-5">
        <div className="mb-4 lg:grid lg:grid-cols-5 space-y-1.5 gap-3">
          <div className="relative h-[400px] lg:col-span-3">
            <Image
              fill
              src={`${appConfig.baseURL}/assets${event.thumbnail}`}
              alt="thumbnail image"
              className="bg-slate-200 object-cover rounded-xl"
            />
          </div>
          <div className="lg:col-span-2">
          <h1 className="text-xl font-semibold my-4 p-3">{event.title}</h1>
          <p className="text-base font-light p-3">{format(new Date(event.startDate),'dd MMMM yyyy' )} -{' '}
            {format(new Date(event.endDate),'dd MMMM yyyy')}
            </p>
          <p className="text-base font-light p-3">{format(new Date(event.startDate),'hh:mm' )} -{' '}
            {format(new Date(event.endDate),'hh:mm')}
            </p>
          <p className="text-base font-light p-3 mb-8">{event.address} -{'  '}{event.city}
            </p>

            <Separator/>
            <p className="text-base font-light p-3">Organizer</p>
          </div>
        </div>
      </section>
      <section>

      </section>
    </main>
  );
};

export default EventDetail;
