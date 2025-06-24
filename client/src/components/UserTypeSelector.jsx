// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   GraduationCap,
//   Calendar,
//   ArrowRight,
// } from "lucide-react";


// const UserTypeCard = ({
//   icon: Icon,
//   title,
//   description,
//   link,
//   buttonText,
//   accentColor,
//   imageSrc,
// }) => {
//   return (
//     <motion.div
//       className="w-full rounded-xl border bg-white border-gray-200 overflow-hidden"
//       transition={{ duration: 0.3 }}
//     >
//       <div className="relative h-40 w-full overflow-hidden">
//         <img
//           src={imageSrc || "/placeholder.svg"}
//           alt={`${title} illustration`}
//           className="w-full h-full object-cover"
//         />
//         <div
//           className="absolute inset-0"
//           style={{
//             background: `linear-gradient(45deg, rgba(0,0,0,0.4), transparent), linear-gradient(to right, ${accentColor}40, transparent)`,
//           }}
//         />
//       </div>

//       {/* Card content */}
//       <div className="p-4 space-y-3">
//         <div className="flex items-center gap-2">
//           <div className="p-1.5 rounded-lg" style={{ color: accentColor }}>
//             <Icon className="w-4 h-4" />
//           </div>
//           <span className="text-xs font-medium" style={{ color: accentColor }}>
//             {title.split(" ")[2]}
//           </span>
//         </div>

//         <div className="space-y-2">
//           <h3 className="text-lg font-bold text-gray-900">{title}</h3>
//           <p className="text-gray-600 text-xs leading-relaxed">{description}</p>
//         </div>

//         <div className="flex flex-wrap gap-1">
//           <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
//             Full Support
//           </span>
//           <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
//             Workspaces
//           </span>
//         </div>

//         <Link to={link}>
//           <motion.div
//             className="flex items-center gap-1 font-medium mt-2"
//             whileHover={{ x: 3 }}
//             style={{ color: accentColor }}
//           >
//             <span className="text-sm">{buttonText}</span>
//             <ArrowRight className="w-3.5 h-3.5" />
//           </motion.div>
//         </Link>
//       </div>
//     </motion.div>
//   );
// };

// const UserTypeSelector = () => {
//   return (
//     <div className="p-4">
//       <div className="max-w-7xl mx-auto mt-8 md:mt-14">
//         <div className="space-y-4">
//           <motion.div
//             className="text-center space-y-2"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             <span className="inline-block px-4 py-1.5 bg-black/5 rounded-full text-sm font-medium text-gray-600 tracking-wider hover:bg-black/10 transition-colors duration-300">
//               Get Started
//             </span>
//             <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
//               Are You a Faculty Member or a Student?
//             </h2>
//             <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
//               Select your role to access personalized resources
//             </p>
//           </motion.div>

//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-2 gap-6"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <UserTypeCard
//               icon={GraduationCap}
//               title="I'm a Student"
//               description="Access learning materials and develop skills in renewable energy."
//               link="/activities"
//               buttonText="Discover Activities"
//               accentColor="#3B82F6"
//               imageSrc="/DSXT0698.jpg"
//             />

//             <UserTypeCard
//               icon={Calendar}
//               title="I'm a Faculty Member"
//               description="Schedule lab sessions and manage research projects."
//               link="/booking"
//               buttonText="Book a Session"
//               accentColor="#8B5CF6"
//               imageSrc="/BRG_6878.JPG"
//             />
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserTypeSelector;
