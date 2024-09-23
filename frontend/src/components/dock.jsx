import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, Library, MessageCircle, Plus, User } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

function Dock() {
  let mouseX = useMotionValue(Infinity);
  const { ischatvisible, setischatvisible } = useContext(AuthContext);
  const buttons = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Chat with AI",
      onClick: () => {
        setischatvisible(!ischatvisible);
      },
      icon: MessageCircle,
    },
    {
      name: "Upload Images",
      path: "/ocr",
      icon: Plus,
    },
    {
      name: "Library",
      path: "/library",
      icon: Library,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto flex h-16 items-end gap-2 sm:gap-4 rounded-2xl px-2 sm:px-4 pb-2 sm:pb-3 bg-white"
    >
      {buttons.map((item) => (
        <div key={item.name} className="">
          {item?.onClick ? (
            <div onClick={item?.onClick} data-tooltip-id={item.name}>
              <AppIcon mouseX={mouseX} name={item.name} icon={item.icon} />
            </div>
          ) : (
            <Link to={item.path} data-tooltip-id={item.name}>
              <AppIcon mouseX={mouseX} name={item.name} icon={item.icon} />
            </Link>
          )}
          <ReactTooltip id={item.name} place="top" content={item.name} />
        </div>
      ))}
    </motion.div>
  );
}

function AppIcon({ mouseX, name, icon: Icon }) {
  let ref = useRef(null);
  const [screenSize, setScreenSize] = useState("large");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("small");
      } else if (window.innerWidth < 1024) {
        setScreenSize("medium");
      } else {
        setScreenSize("large");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set the correct size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthSync;
  if (screenSize === "small") {
    widthSync = useTransform(distance, [-50, 0, 50], [20, 30, 20]);
  } else if (screenSize === "medium") {
    widthSync = useTransform(distance, [-75, 0, 75], [30, 50, 30]);
  } else {
    widthSync = useTransform(distance, [-100, 0, 100], [40, 60, 40]);
  }

  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square w-8 sm:w-10 rounded-full flex items-center justify-center"
    >
      <Icon className="w-full h-full object-contain" />
    </motion.div>
  );
}

export default Dock;
