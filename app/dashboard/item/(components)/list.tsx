"use client";

import { IListItem } from "@interfaces/pages";
import { Image, List } from "antd";
import ItemView from "./item-view";
import { useState } from "react";

export default function ListItems({ data, readers, onHandleDelete }: IListItem) {
    const [preview, setPreview] = useState(false);

    return (
        <List
            grid={{ gutter: 0, column: 6 }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Image
                        width={200}
                        preview={{
                            visible: preview,
                            onVisibleChange: () => setPreview(!preview),
                            imageRender: () => (
                                <ItemView
                                    item={item}
                                    onHandleDelete={onHandleDelete}
                                    readers={readers}
                                    closePreview={() => setPreview(false)}
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