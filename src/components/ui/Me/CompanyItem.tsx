export function CompanyItem({ company }: { company: string }) {
    return (
        <div className="pb-8 text-[var(--muted)]">
            {company}
        </div>
    );
}