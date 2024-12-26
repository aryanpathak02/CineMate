import React, { useState, useEffect } from "react";

function ScrollToTop({ showAt = 300, smooth = true }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            setIsVisible(scrollPosition > showAt);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [showAt]);

    const scrollToTop = () => {
        if (smooth) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            window.scrollTo(0, 0);
        }
    };

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-5 right-14 bg-[#6556CD] text-white p-2 rounded-md shadow-lg transition"
                aria-label="Go to the top"
            >
                <i className="ri-arrow-up-line "></i>
            </button>
        )
    );
}

export default ScrollToTop;
