import FAIcon from "./FAIcon";

interface properties{
    title : string;
}

export default function DoneTask(props: properties) {
    const { title } = props;
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <span className="text-white flex-1">{title}</span>
        </div>

    );
}