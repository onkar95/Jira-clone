import { cn } from "@/lib/utils";

interface DottedSeparatorProps {
    className?: string;
    color?: string;
    height?: string;
    dotSize?: string;
    gapSize?: string;
    direction?: "horizontal" | "vertical";
}

export const DottedSeparator = ({
    className, color = "#d4d4d8",
    height = "2px",
    dotSize = "2px",
    gapSize = "6px", direction = "horizontal"
}: DottedSeparatorProps) => {

    const isHorizonatal = direction === "horizontal"

    return (
        <div className={cn(
            isHorizonatal ? "w-full flex items-center" : "h-full flex flex-col items-center", className
        )}>
            <div className={isHorizonatal ? 'flex-grow' : "flex-grow-0"}
                style={{
                    width: isHorizonatal ? "100%" : height,
                    height: isHorizonatal ? height : '100%',
                    backgroundImage: `radial-gradient(circle,${color} 25%, transparent 25%)`,
                    backgroundSize: isHorizonatal ? `${parseInt(dotSize) + parseInt(gapSize)}px ${height}` : `${height} ${parseInt(dotSize) + parseInt(gapSize)}px `,
                    backgroundRepeat: isHorizonatal ? "repeat-x" : "repeat-y",
                    backgroundPosition: 'center'

                }}
            >

            </div>
        </div>
    )
}