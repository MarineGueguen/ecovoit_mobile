import { SafeAreaView } from "react-native";
import { IProps } from "../../interfaces/container";
import { styles } from "../../assets/styles";

const MainContainer: React.FC<IProps> = ({ children }) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            { children }
        </SafeAreaView>
    );
};

export default MainContainer;
