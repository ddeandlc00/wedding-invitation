type MonogramProps = {
    className?: string;
};

export function Monogram({ className = 'h-16 w-16' }: MonogramProps) {
    return (
        <img
            src="/images/sr-monogram.webp"
            alt=""
            width={512}
            height={512}
            className={className}
        />
    );
}
