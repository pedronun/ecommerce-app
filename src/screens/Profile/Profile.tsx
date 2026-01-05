import { Layout } from '@components/Layout/Layout';
import { Card, Divider, Icon, Text } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';
import { ScrollView, Switch, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getProfileStyles } from './Profile.styles';

function Profile() {
  const { theme, mode, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getProfileStyles(theme, insets);

  return (
    <Layout>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrapper}>
            <Icon
              family="MaterialIcons"
              name="account-circle"
              size={80}
              color={theme.colors.primary}
            />
          </View>
          <Text variant="h3" style={styles.userName}>
            Usuário
          </Text>
          <Text variant="body2" style={styles.userEmail}>
            usuario@exemplo.com
          </Text>
        </View>

        <Divider style={styles.mainDivider} />

        <View style={styles.section}>
          <Text variant="h4" style={styles.sectionTitle}>
            Dados Pessoais
          </Text>

          <Card variant="outlined" style={styles.card}>
            <View style={styles.placeholderContainer}>
              <Icon
                family="MaterialIcons"
                name="account-circle"
                size={48}
                color={theme.colors.text.disabled}
                style={styles.placeholderIcon}
              />
              <Text variant="body2" style={styles.placeholderText}>
                Em desenvolvimento...
              </Text>
              <Text variant="caption" style={styles.placeholderDescription}>
                Esta seção conterá suas informações pessoais
              </Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text variant="h4" style={styles.sectionTitle}>
            Configurações
          </Text>

          <Card variant="outlined" style={styles.card}>
            <TouchableOpacity style={styles.settingItem} onPress={toggleTheme} activeOpacity={0.7}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIconContainer}>
                  <Icon
                    family="Ionicons"
                    name={mode === 'dark' ? 'moon' : 'sunny'}
                    size={22}
                    color={theme.colors.primary}
                  />
                </View>
                <View style={styles.settingTextContainer}>
                  <Text variant="body1" style={styles.settingTitle}>
                    Tema {mode === 'dark' ? 'Escuro' : 'Claro'}
                  </Text>
                  <Text variant="caption" style={styles.settingDescription}>
                    Alternar entre tema claro e escuro
                  </Text>
                </View>
              </View>
              <Switch
                value={mode === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primaryLight,
                }}
                thumbColor={mode === 'dark' ? theme.colors.primary : '#f4f3f4'}
                ios_backgroundColor={theme.colors.border}
              />
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </Layout>
  );
}

export default Profile;
