import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import { FC } from "react";
  
  interface BreadcrumbProps {
    paths: { label: string; href: string }[];
    id?: string;
  }
  
  const CustomBreadcrumb: FC<BreadcrumbProps> = ({ paths, id }) => {
    const pathArray = window.location.pathname.split("").filter(Boolean);
    return (
      <div className="hidden md:block mt-3 ml-5">
          <div className="p-3 font-medium cursor-pointer text-marine-400">
        <Breadcrumb>
          <BreadcrumbList>
            {paths.map((path, index) => (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={path.href}>{path.label}</BreadcrumbLink>
                {index < paths.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            ))}
            {pathArray.map((path, index) => (
              <BreadcrumbItem key={index}>
                <a href={`${pathArray.slice(0, index + 1).join("")}`}></a>
                {index < pathArray.length - 1}
              </BreadcrumbItem>
            ))}
           
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      </div>
    );
  };
  
  export default CustomBreadcrumb;
  