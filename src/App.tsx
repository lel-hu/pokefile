import { useEffect, useState } from "react";
import {
  Typography,
  IconButton,
  Stack,
  Box,
  Paper,
  Button,
} from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Wikidata from "./utils/API/wikidata";

const App: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [pokemon, setPokemon] = useState<{ ja: string; en: string }>({
    ja: "",
    en: "",
  });

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const result = await Wikidata.fetchRandomPokemon();
        setPokemon(result);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    fetchPokemon();
  }, []);

  const correctTypes: string[] = ["でんき"];
  const types = [
    { jpn: "ノーマル", eng: "nomal", color: "9FA19F" },
    { jpn: "ほのお", eng: "fire", color: "F08030" },
    { jpn: "みず", eng: "water", color: "4592C4" },
    { jpn: "でんき", eng: "electric", color: "F8D030" },
    { jpn: "くさ", eng: "grass", color: "78C850" },
    { jpn: "こおり", eng: "ice", color: "98D8D8" },
    { jpn: "かくとう", eng: "fighting", color: "C03028" },
    { jpn: "どく", eng: "poison", color: "A040A0" },
    { jpn: "じめん", eng: "ground", color: "E0C068" },
    { jpn: "ひこう", eng: "flying", color: "A890F0" },
    { jpn: "エスパー", eng: "psychic", color: "F85888" },
    { jpn: "むし", eng: "bug", color: "A8B820" },
    { jpn: "いわ", eng: "rock", color: "B8A038" },
    { jpn: "ゴースト", eng: "ghost", color: "705898" },
    { jpn: "ドラゴン", eng: "dragon", color: "7038F8" },
    { jpn: "あく", eng: "dark", color: "705848" },
    { jpn: "はがね", eng: "steel", color: "B8B8D0" },
    { jpn: "フェアリー", eng: "fairy", color: "EE99AC" },
  ];

  const handleButtonClick = (type: string) => {
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter((t) => t !== type);
      } else if (prevSelectedTypes.length < 2) {
        return [...prevSelectedTypes, type];
      } else {
        return [type];
      }
    });
  };

  const handleCheckAnswer = () => {
    const isCorrect =
      selectedTypes.length === correctTypes.length &&
      selectedTypes.every((type) => correctTypes.includes(type));
    setIsCorrect(isCorrect);
  };
  const handleNextPokemon = () => {
    // setIsCorrect(null);
    // setSelectedTypes([]);
    const fetchPokemon = async () => {
      try {
        const result = await Wikidata.fetchRandomPokemon();
        setPokemon(result);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      }
    };

    fetchPokemon();
  };

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <Typography variant="h4">PokeFile</Typography>
      <Typography variant="h6">ポケモンのタイプを当てよう！</Typography>
      <Box sx={{ p: 2 }} />

      <Paper sx={{ width: "fit-content", p: 2 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Typography variant="h6" sx={{ minWidth: "200px" }}>
            {pokemon.en}
            <br />
            {pokemon.ja}
          </Typography>
          <IconButton onClick={handleNextPokemon}>
            <ChangeCircleIcon />
          </IconButton>
        </Stack>
      </Paper>
      <Box sx={{ p: 2 }} />
      <Paper
        elevation={3}
        sx={{
          p: "16px 0px 16px 0px",
          width: "fit-content",
          borderRadius: "40px 8px 40px 8px",
          backgroundColor: "#E7EDF5",
        }}
      >
        <Box sx={{ justifyItems: "center", alignContent: "center" }}>
          <Paper
            elevation={3}
            sx={{
              flexDirection: "row",
              display: "flex",
              backgroundColor: "#ECF4F8",
              alignItems: "center",
              borderRadius: 40,
              p: "8px 16px 8px 16px",
              width: "fit-content",
            }}
          >
            <Typography>タイプを選択（2つまで）</Typography>
            <Box sx={{ p: 1 }} />
            <Button
              variant="outlined"
              onClick={() => setSelectedTypes([])}
              sx={{
                borderRadius: 40,
                color: "#FF0000",
                border: `1px solid #FF0000`,
              }}
            >
              {" "}
              リセット{" "}
            </Button>
          </Paper>
          <Box sx={{ p: 1 }} />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: 620,
            }}
          >
            {types.map((type) => (
              <Button
                variant={
                  selectedTypes.includes(type.jpn) ? "outlined" : "contained"
                }
                key={type.jpn}
                sx={{
                  m: 1,
                  flex: "1 1 calc(33.333% - 16px)",
                  bgcolor: selectedTypes.includes(type.jpn)
                    ? "#FFFFFF"
                    : `#${type.color}`,
                  color: selectedTypes.includes(type.jpn)
                    ? `#${type.color}`
                    : "#FFFFFF",
                  border: `1px solid #${type.color}`,
                  width: "auto",
                  height: 60,
                  borderRadius: "24px 8px 24px 8px",
                }}
                onClick={() => handleButtonClick(type.jpn)}
              >
                {type.eng}
                <br />
                {type.jpn}
              </Button>
            ))}
          </Box>
        </Box>
      </Paper>

      <Box sx={{ p: 2 }} />
      <Button variant="contained" onClick={handleCheckAnswer}>
        答え合わせ / checking answers
      </Button>
      {isCorrect !== null && (
        <Typography variant="h6">
          {isCorrect ? "正解です！" : "不正解です。"}
        </Typography>
      )}
    </div>
  );
};

export default App;
