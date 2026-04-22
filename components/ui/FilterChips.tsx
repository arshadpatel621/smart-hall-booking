import { Pressable, StyleSheet, Text, View } from "react-native";

type FilterChipsProps = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

export function FilterChips({ options, selected, onSelect }: FilterChipsProps) {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const active = option === selected;
        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            style={[styles.chip, active && styles.activeChip]}
          >
            <Text style={[styles.label, active && styles.activeLabel]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    borderWidth: 1,
    borderColor: "#334155",
    backgroundColor: "#0b1220",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  activeChip: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5",
  },
  label: {
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: "500",
  },
  activeLabel: {
    color: "#ffffff",
  },
});
