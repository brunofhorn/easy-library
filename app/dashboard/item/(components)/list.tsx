import { IListItem } from "@interfaces/pages";
import { Image, List } from "antd";
import ItemView from "./item-view";
import { api } from "@/lib/api";
import { IReader } from "@interfaces/common";

async function getReaders() {
    const { data } = await api.get(`readers`);

    return data?.readers?.map((reader: IReader) => {
        return { key: reader.id, label: reader.name, value: reader.id };
    });
}

export default async function ListItems({ data, onHandleDelete }: IListItem) {
    const readers = await getReaders();

    return (
        <List
            grid={{ gutter: 0, column: 6 }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Image
                        width={200}
                        preview={{
                            imageRender: () => <ItemView item={item} onHandleDelete={onHandleDelete} readers={readers} />,
                            toolbarRender: () => null,
                        }}
                        src={item?.coverImage?.toString()}
                        alt={item.title}
                    />
                </List.Item>
            )}
        />
    );
};