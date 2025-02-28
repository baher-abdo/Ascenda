import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Rating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const totalStars = 5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-[#F2994A]" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-[#F2994A]" />);
  }
  for (let i = fullStars + (hasHalfStar ? 1 : 0); i < totalStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-[#F2994A]" />);
  }

  return <div className="flex space-x-1">{stars}</div>;
}
