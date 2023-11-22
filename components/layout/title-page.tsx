import { ITitlePage } from "@interfaces/components";
import Typography from "../shared/typography";

export default function TitlePage({ title }: ITitlePage) {
    return (
        <Typography variant="h6" className="mb-3">{title}</Typography>
    );
};