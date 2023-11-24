import { IListItem } from "@interfaces/pages";
import { Image, List } from "antd";
import ItemView from "./item-view";

export default function ListItems({ data, readers, onHandleDelete }: IListItem) {
    return (
        <List
            grid={{ gutter: 3, column: 6 }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Image
                        width={160}
                        height={230}
                        preview={{
                            imageRender: () => (
                                <ItemView
                                    item={item}
                                    onHandleDelete={onHandleDelete}
                                    readers={readers}
                                />
                            ),
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