import Image from "next/image";
import Link from "next/link";
import {Pokemon} from "@/types/pokemon";

type Props = {
    evolution: Pokemon;
};

export const EvolutionThumbnail = ({evolution}: Props) => (
    <Link href={`/pokemon/${evolution.name}`} className="w-[70px] shrink-0 no-underline">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
            <Image src={evolution.sprites} alt={evolution.name} fill sizes="70px" className="object-contain p-1" />
        </div>
        <div className="mt-1.5 truncate text-center text-xs font-bold text-gray-600 capitalize">
            {evolution.name}
        </div>
    </Link>
);
