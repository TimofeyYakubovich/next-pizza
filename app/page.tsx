// import Image from "next/image";

import { Container, Title } from "@/components/shared";
import { Button } from "@/components/ui/button";

// главная страница
export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
    </>
    
  );
}
