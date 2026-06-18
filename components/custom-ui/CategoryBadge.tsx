import { lucideIconByName } from "@/lib/halper-function";

const dimensionMap = {
    sm: { box: 'h-8 w-8', icon: 14 },
    md: { box: 'h-9 w-9', icon: 16 },
    lg: { box: 'h-12 w-12', icon: 22 },
};

interface CategoryBadgeProps {
    name: string;
    icon: any;
    color: string;
    size: string;
}

const CategoryBadge = ({ name, icon, color, size = 'md' }: CategoryBadgeProps) => {
    const Icon = lucideIconByName(icon);
    const { box, icon: iconSize } = dimensionMap[size as keyof typeof dimensionMap];
    const baseColor = color || '#64748B';

    return (
        <div className="flex items-center gap-3 min-w-0">
            <div
                className={`${box} rounded-lg flex items-center justify-center shrink-0`}
                style={{ backgroundColor: baseColor + '1A' }}
            >
                <Icon size={iconSize} style={{ color: baseColor }} />
            </div>
            {name && <span className="font-medium text-slate-900 truncate">{name}</span>}
        </div>
    );
};

export default CategoryBadge;
