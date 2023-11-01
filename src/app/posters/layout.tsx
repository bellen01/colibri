"use client";
import HeroHeading from "@/components/General/HeroHeading"
import ProductFilter from "@/components/Products/ProductFilter"
import UserNav from "@/components/User/UserNav"
import styles from '@/app/posters/layout.module.scss';
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostersLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {

    const [currentPage, setCurrentPage] = useState<string>()
    console.log("selectedsegment", useSelectedLayoutSegment());
    const currentSegment = useSelectedLayoutSegment();

    function capitalizeFirstLetter(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    useEffect(() => {
        setCurrentPage("")
        if (currentSegment) {
            const currentSegmentWithCapitalFirstLetter = capitalizeFirstLetter(currentSegment);
            console.log('stor bokstav', currentSegmentWithCapitalFirstLetter);
            setCurrentPage(currentSegmentWithCapitalFirstLetter)
        }
    }, [currentSegment])

    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <HeroHeading heading={currentPage ? currentPage : "Posters"} />
            <div className={styles.filterAndChildrenContainer}>
                <ProductFilter />
                {children}
            </div>

        </section>
    )
}