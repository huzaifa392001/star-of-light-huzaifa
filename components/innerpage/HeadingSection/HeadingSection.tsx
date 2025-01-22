import React, { useEffect, useRef } from "react";
import s from "./HeadingSection.module.scss";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface HeadingSectionProps {
  image?: string;
  heading?: string;
}
// Reeller.gsap = gsap;

const HeadingSection: React.FC<HeadingSectionProps> = ({ image, heading }) => {
  const reelContainerRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let timeline: gsap.core.Timeline | null = null; // Store the timeline
      const clones: HTMLElement[] = []; // Store the clones for cleanup

      const scrollLetters = () => {
        let direction = 1; // 1 = forward, -1 = backward scroll
      
        const wrapper = horizontalLoop(".headingScroll h2", { duration: 7 });
        ScrollTrigger.create({
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate(self) {
            const velocity = Math.abs(self.getVelocity()); // Get scroll velocity
            const speedFactor = Math.min(Math.max(velocity / 100, 0.5), 5); // Adjust speed (0.5 to 5)
            timeline?.timeScale(speedFactor * direction); // Update animation speed based on scroll velocity
      
            if (self.direction !== direction) {
              direction *= -1;
              timeline?.timeScale(speedFactor * direction); // Adjust direction
            }
          },
        });
      
        function horizontalLoop(targets: string, vars: any, reverse?: boolean) {
          vars = vars || {};
          vars.ease || (vars.ease = "none");
          const tl = gsap.timeline({
            repeat: -1,
            onReverseComplete() {
              this.totalTime(this.rawTime() + this.duration() * 10);
            },
          });
      
          const elements = gsap.utils.toArray(targets) as HTMLElement[];
      
          // Create clones and store them
          elements.forEach((el) => {
            const clone = el.cloneNode(true) as HTMLElement;
            el.parentNode?.appendChild(clone);
            clones.push(clone); // Store clone for cleanup
            clones.push(clone); // Store clone for cleanup
          });
      
          const positionClones = () =>
            elements.forEach((el, i) =>
              gsap.set(clones[i], {
                position: "absolute",
                overwrite: false,
                top: el.offsetTop,
                left:
                  el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth),
              })
            );
      
          positionClones();
      
          elements.forEach((el, i) =>
            tl.to(
              [el, clones[i]],
              { xPercent: reverse ? 100 : -100, ...vars },
              0
            )
          );
      
          window.addEventListener("resize", () => {
            const time = tl.totalTime();
            tl.totalTime(0);
            positionClones();
            tl.totalTime(time);
          });
      
          timeline = tl; // Store timeline for cleanup
          return tl;
        }
      };      

      if (container?.current) {
        scrollLetters();
        return () => {
          // Cleanup clones
          clones.forEach((clone) => clone.remove());
          clones.length = 0; // Clear the array

          // Kill timeline and ScrollTrigger
          timeline?.kill();
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      }
    },
    { scope: container }
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container?.current!.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(starRef.current, {
        x: x * 0.5,
        y: y * 0.5,
        ease: "power2.out",
        duration: 0.4,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(starRef.current, {
        x: 0,
        y: 0,
        ease: "elastic.out(1.5, 0.4)",
        duration: 1.5,
      });
    };

    if (container?.current) {
      const currentContainer = container.current;
      currentContainer.addEventListener("mousemove", handleMouseMove);
      currentContainer.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        currentContainer.removeEventListener("mousemove", handleMouseMove);
        currentContainer.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div className={s.headingWrapper} ref={container}>
      <figure className={s.headingImage} ref={starRef}>
        <Image
          src={image || "/default-image.jpg"}
          width={360}
          height={538}
          alt={heading || "Default heading"}
        />
      </figure>
      <div className={`headingScroll ${s.headingScroll}`}>
        <h2 className={s.heading}>{heading}</h2>
      </div>
    </div>
  );
};

export default HeadingSection;
