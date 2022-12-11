import { ReactNode } from 'react';

interface ListProps<T> {
    item: Array<T>;
    render: (item: T) => ReactNode;
    keyExtractor: (item: T) => string;
    listRole: 'list' | 'tablist';
    listItemRole: 'listitem' | 'tab';
};

// Generic list component
const List = <T,>({ item, render, keyExtractor, listRole, listItemRole }: ListProps<T>) => {
    return (
        <ul role={listRole}>
            {item.map((item) => {
                return (
                    <li 
                        key={keyExtractor(item)}
                        role={listItemRole}
                        aria-controls={keyExtractor(item)}
                    >
                            {render(item)}
                    </li>
                )
            })}
        </ul>
    );
}

export default List;