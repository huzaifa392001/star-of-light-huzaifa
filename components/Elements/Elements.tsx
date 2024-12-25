import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import e from "./elements.module.scss";
import gsap from "gsap";
import Image from "next/image";

function Elements() {
    const elementContainerRef = useRef<HTMLDivElement>(null);
    const images = ["1.svg", "2.svg", "3.svg", "4.svg", "5.svg", "6.svg", "7.svg", "8.svg"];
    const mm = gsap.matchMedia(); // GSAP MatchMedia Instance

    // useGSAP(() => {
    //     mm.add("(min-width: 800px)", () => {
    //         // Animation for desktop only
    //         setTimeout(() => {
    //             if (elementContainerRef.current) {
    //                 const workDiv = document.querySelector("#work");
    //                 const workDivHeight = workDiv?.getBoundingClientRect()?.height || 0;
    //                 const archiveDiv = document.querySelector("#archive");
    //                 const archiveDivHeight = archiveDiv?.getBoundingClientRect()?.height || 0;

    //                 let tl = gsap.timeline({
    //                     defaults: { ease: "none", stagger: 0.1 },
    //                     scrollTrigger: {
    //                         trigger: elementContainerRef.current,
    //                         scrub: true,
    //                         start: "top top",
    //                         end: `+=${workDivHeight}`,
    //                     },
    //                 });

    //                 tl.to(Array.from(elementContainerRef.current.children), {
    //                     scale: 1,
    //                 })
    //                     .to(Array.from(elementContainerRef.current.children), {
    //                         left: "150%",
    //                         top: "15%",
    //                     }, "-=0.95")
    //                     .to(Array.from(elementContainerRef.current.children), {
    //                         left: "-150%",
    //                         top: "70%",
    //                     }, "-=0.5")
    //                     .to(Array.from(elementContainerRef.current.children), {
    //                         left: "120%",
    //                         top: "50%",
    //                     }, "-=0.5")
    //                     .to(Array.from(elementContainerRef.current.children), {
    //                         left: "50%",
    //                         top: "0%",
    //                     }, "-=0.5")
    //                     .to(Array.from(elementContainerRef.current.children), {
    //                         left: "50%",
    //                         top: "90%",
    //                     }, "-=0.5")
    //                     .to(Array.from(elementContainerRef.current.children), {
    //                         scale: 0,
    //                     }, "-=0.95");

    //                 // Second animation timeline
    //                 let secondTl = gsap.timeline({
    //                     defaults: { ease: "none", stagger: 0.1 },
    //                     scrollTrigger: {
    //                         trigger: elementContainerRef.current,
    //                         scrub: true,
    //                         start: `top+=${workDivHeight} top`,
    //                         end: `+=${archiveDivHeight + 15000}`,
    //                     },
    //                 });

    //                 secondTl.to(elementContainerRef.current.children, {
    //                     scale: 1,
    //                 })
    //                     .to(elementContainerRef.current.children, {
    //                         left: "80%",
    //                         top: "10%",
    //                     }, "<")
    //                     .to(elementContainerRef.current.children, {
    //                         left: "10%",
    //                         top: "90%",
    //                     }, "-=0.5")
    //                     .to(elementContainerRef.current.children, {
    //                         left: "35%",
    //                         top: "5%",
    //                     }, "-=0.5")
    //                     .to(elementContainerRef.current.children, {
    //                         left: "90%",
    //                         top: "85%",
    //                     }, "-=0.5")
    //                     .to(elementContainerRef.current.children, {
    //                         left: "50%",
    //                         top: "50%",
    //                     }, "-=0.5")
    //                     .to(elementContainerRef.current.children, {
    //                         left: "50%",
    //                         top: "5%",
    //                     }, "-=0.5")
    //                     .to(elementContainerRef.current.children, {
    //                         scale: 0,
    //                     }, "<");
    //             }
    //         }, 1500);
    //     });
    // }, { scope: elementContainerRef });

    return (
        <></>
        // <div className={e.mainElements} ref={elementContainerRef}>
        //     {images.map((src, index) => (
        //         <Image
        //             src={`/SVGElements/${src}`}
        //             width={250}
        //             height={250}
        //             alt={`Element ${index}`}
        //             key={index}
        //             style={{ zIndex: images.length - index }}
        //         />
        //     ))}
        // </div>
    );
}

export default Elements;
