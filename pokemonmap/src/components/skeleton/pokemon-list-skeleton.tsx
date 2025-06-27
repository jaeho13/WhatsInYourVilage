import PokemonSkeleton from "./pokemon-item-skeleton";

export default function PokemonListSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <PokemonSkeleton key={`pokemon-list-skeleton-${idx}`} />);
}
