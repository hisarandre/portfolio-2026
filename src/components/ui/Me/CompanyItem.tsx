
export function CompanyItem({ company }: { company: string }) {
    return (
        <div className="text-lg leading-none pb-8 text-[var(--muted)]">
            {company}
        </div>
    );
}