import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

interface Size {
    name: string;
    boy_min: number;
    boy_max: number;
    kilo_min: number;
    kilo_max: number;
}

interface DetailSizeType {
    flag: boolean;
    setFlag: (value: boolean) => void;
    img: string | undefined;
}

const sizes: Size[] = [
    { name: "xs", boy_min: 150, boy_max: 160, kilo_min: 40, kilo_max: 50 },
    { name: "s", boy_min: 160, boy_max: 170, kilo_min: 50, kilo_max: 60 },
    { name: "m", boy_min: 165, boy_max: 175, kilo_min: 60, kilo_max: 70 },
    { name: "l", boy_min: 170, boy_max: 180, kilo_min: 70, kilo_max: 80 },
    { name: "xl", boy_min: 175, boy_max: 185, kilo_min: 80, kilo_max: 90 },
    { name: "xxl", boy_min: 180, boy_max: 190, kilo_min: 90, kilo_max: 100 }
];

function DetailSize({ flag, setFlag, img }: DetailSizeType) {
    const [boy, setBoy] = useState<number | string>("");
    const [kilo, setKilo] = useState<number | string>("");
    const [size, setSize] = useState<string | null>(null);

    const findSize = (boy: number, kilo: number): string => {
        for (let size of sizes) {
            if (boy >= size.boy_min && boy <= size.boy_max && kilo >= size.kilo_min && kilo <= size.kilo_max) {
                return size.name;
            }
        }

        let closestSize = sizes[0];

        for (let size of sizes) {
            if (
                Math.abs(boy - size.boy_max) < Math.abs(boy - closestSize.boy_max) ||
                Math.abs(kilo - size.kilo_max) < Math.abs(kilo - closestSize.kilo_max)
            ) {
                closestSize = size;
            }
        }

        return closestSize.name;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (typeof boy === "number" && typeof kilo === "number") {
            const bodySize = findSize(boy, kilo);
            setSize(bodySize);
        } else {
            setSize(null);
        }
    };

    useEffect(() => {
        if (flag) {
            document.body.style.overflow = "hidden"; 
        } else {
            document.body.style.overflow = "auto"; 
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [flag]);

    return (
        <div
            style={{
                zIndex: flag ? '900' : '-1',
                visibility: flag ? 'visible' : 'hidden',
                opacity: flag ? '1' : '0'
            }}
            className={`fixed duration-300 inset-0 bg-[#00000080] flex items-center justify-center`}>
            <div className="bg-white px-8 py-5 max-w-[700px] w-full rounded-md">
                <div className="flex justify-between mb-3 items-center">
                    <h1 className="text-[20px] text-[#00174f] font-semibold">Size Finder</h1>
                    <button
                        onClick={() => setFlag(false)}
                    >
                        <FaXmark />
                    </button>
                </div>
                <div className="flex gap-10">
                    <div className="h-[320px] w-[240px]">
                        <img src={img} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="relative">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-[3px] text-[12px] text-[#00174f] pl-3 w-full">Height (cm): </label>
                                <input
                                    type="number"
                                    value={boy}
                                    className="block border rounded-md outline-none px-2 py-3 w-full"
                                    onChange={(e) => setBoy(Number(e.target.value))}
                                    placeholder="Enter your height"
                                />
                            </div>
                            <div className="mb-8">
                                <label className="block mb-[3px] text-[12px] text-[#00174f] pl-3 w-full">Kilo (kg): </label>
                                <input
                                    type="number"
                                    value={kilo}
                                    className="block border rounded-md outline-none px-2 py-3 w-full"
                                    onChange={(e) => setKilo(Number(e.target.value))}
                                    placeholder="Enter your weight"
                                />
                            </div>
                            {size && <p className="text-[#00174f] text-[15px]">Your size: {size.toUpperCase()}</p>}
                            <button className="bg-[#00174f] py-3 rounded-md hover:underline absolute bottom-0 left-0 right-0 text-white block w-full" type="submit">Bedeni Bul</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailSize;
