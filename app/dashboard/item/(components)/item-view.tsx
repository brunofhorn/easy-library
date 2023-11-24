import Image from "next/image";
import { Button, Divider, message } from "antd";
import { IItemView } from "@interfaces/pages";
import Iconify from "@/components/shared/iconify";
import Typography from "@/components/shared/typography";
import { IAuthor } from "@interfaces/common";
import { api } from "@/lib/api";
import FormBorrow from "./form-borrow";

async function deleteItem(id: string) {
    const { data } = await api.delete(`item/${id}`);

    return data.items;
}

export default function ItemView({ item, onHandleDelete, readers }: IItemView) {
    const [messageApi, contextHolder] = message.useMessage();

    const handleDelete = async (id: string) => {
        const response = await deleteItem(id);

        if (response.status === 200) {
            onHandleDelete(id);
        } else {
            messageApi.open({
                type: "error",
                content: `Ocorreu um erro ao tentar excluir o item.`
            });
        }
    };

    return (
        <>
            {contextHolder}
            <div className="bg-white w-7/12 h-auto rounded-md p-6 flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-1/3 p-3">
                    <Image
                        width={250}
                        height={180}
                        src={item.coverImage.toString() ?? ""}
                        alt={item.title}
                    />
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row gap-3">
                            <Button className="w-full flex flex-row gap-1 items-center justify-center">
                                <Iconify icon={"la:edit-solid"} />
                                EDITAR
                            </Button>
                            <Button onClick={() => handleDelete(item.id)} className="w-full flex flex-row gap-1 items-center justify-center">
                                <Iconify icon={"iconoir:trash"} />
                                EXCLUIR
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 flex-col justify-start items-start">
                    <Typography variant="h4">{item.title}</Typography>
                    <div className="flex flex-row w-full">
                        <div className="flex flex-row gap-1 w-1/2 justify-start items-center">
                            <Typography variant="span">Categoria:</Typography>
                            <Typography variant="span" className="p-2">{item.itemType.description}</Typography>
                        </div>
                        <div className="flex flex-row gap-1 w-1/2 justify-start items-center">
                            <Typography variant="span">Editora:</Typography>
                            <Typography variant="span">{item.publishingCompany.name}</Typography>
                        </div>
                    </div>
                    <div className="flex flex-row w-full mb-3">
                        <div className="flex flex-row gap-1 w-1/2 justify-start items-center">
                            <Typography variant="span">Autor(es):</Typography>
                            {item.authors.map((author: IAuthor) => (
                                <Typography key={author.id} variant="span">{author.name}
                                </Typography>
                            ))}
                        </div>
                    </div>
                    <Typography variant="span">
                        Sinopse:
                    </Typography>
                    <Typography variant="span" className="text-justify">
                        {item.synopsis?.length > 1200 ? `${item.synopsis.substring(0, 1140)}...` : item.synopsis}
                    </Typography>
                    <Divider />
                    <FormBorrow readers={readers} itemId={item.id} />
                </div>
            </div>
        </>
    );
};