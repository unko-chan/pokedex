import Modal from "@/components/modal";
import Pokemon from "@/components/Pokemon";

interface PokemonModalProps {
  params: {
    id: string;
  };
}

export default async function PokemonModal({ params }: PokemonModalProps) {
  return (
    <Modal>
      <Pokemon name={params.id} />
    </Modal>
  );
}
