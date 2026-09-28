import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, findIconDefinition, IconLookup, IconName } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

// اضافه کردن همه آیکون‌ها از solid و brand
library.add(fas, fab);

type Props = {
  prefix: "fas" | "fab" | "far";
  name: string;
};

export default function FAIcon({ prefix, name }: Props) {
  const iconLookup: IconLookup = { prefix, iconName: name as IconName };
  const icon = findIconDefinition(iconLookup);

  return <FontAwesomeIcon icon={icon} className="text-white text-2xl" />;
}
