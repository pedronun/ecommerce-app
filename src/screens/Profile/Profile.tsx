/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from '@components/Layout/Layout';
import { Button, Card, Divider, Icon, Text } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';
import { ScrollView, Switch, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getProfileStyles } from './Profile.styles';
import { useUser } from '@contexts/UserContext/useUser';
import { NavigationProp, useNavigation } from '@react-navigation/native';

function Profile() {
  const { theme, mode, toggleTheme } = useTheme();
  const { user, isLoggedIn, logout } = useUser();
  const navigation = useNavigation<NavigationProp<any>>();
  const insets = useSafeAreaInsets();
  const styles = getProfileStyles(theme, insets);

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Home');
  };

  return (
    <Layout>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileHeader}>
          {isLoggedIn ? (
            <>
              <View style={styles.avatarWrapper}>
                <Icon
                  family="MaterialIcons"
                  name="account-circle"
                  size={80}
                  color={theme.colors.primary}
                />
              </View>
              <Text variant="h3" style={styles.userName}>
                {user?.name}
              </Text>
              <Text variant="body2" style={styles.userEmail}>
                {user?.email}
              </Text>
            </>
          ) : (
            <>
              <View style={styles.avatarWrapper}>
                <Icon
                  family="MaterialIcons"
                  name="account-circle"
                  size={80}
                  color={theme.colors.primary}
                />
              </View>
              <Text variant="body1" style={styles.userEmail}>
                Faça login para ver suas informações
              </Text>

              <Button variant="primary" fullWidth onPress={() => navigation.navigate('Login')}>
                Login
              </Button>
            </>
          )}
        </View>

        <Divider style={styles.mainDivider} />

        <View style={styles.section}>
          <Text variant="h4" style={styles.sectionTitle}>
            Dados Pessoais
          </Text>

          <Card variant="outlined" style={styles.card}>
            {isLoggedIn && user ? (
              <View style={styles.userDataContainer}>
                <View style={styles.userDataItem}>
                  <Text variant="caption" style={styles.userDataLabel}>
                    Nome Completo
                  </Text>
                  <Text variant="body1" style={styles.userDataValue}>
                    {user.name}
                  </Text>
                </View>
                <View style={styles.userDataItem}>
                  <Text variant="caption" style={styles.userDataLabel}>
                    E-mail
                  </Text>
                  <Text variant="body1" style={styles.userDataValue}>
                    {user.email}
                  </Text>
                </View>
                <View style={[styles.userDataItem]}>
                  <Text variant="caption" style={styles.userDataLabel}>
                    Tipo de Conta
                  </Text>
                  <View style={styles.userDataBadge}>
                    <View style={styles.roleBadge}>
                      <Text style={styles.roleBadgeText}>
                        {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.userDataItem, styles.userDataItemLast]}>
                  <Text variant="caption" style={styles.userDataLabel}>
                    ID do Usuário
                  </Text>
                  <Text variant="body2" style={styles.userDataValue}>
                    #{user.id}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.placeholderContainer}>
                <Icon
                  family="MaterialIcons"
                  name="account-circle"
                  size={48}
                  color={theme.colors.text.disabled}
                  style={styles.placeholderIcon}
                />
                <Text variant="body2" style={styles.placeholderText}>
                  Faça login para ver seus dados
                </Text>
                <Text variant="caption" style={styles.placeholderDescription}>
                  Entre na sua conta para acessar suas informações pessoais
                </Text>
              </View>
            )}
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

        {isLoggedIn && (
          <View style={styles.logoutButtonContainer}>
            <Button
              variant="danger"
              onPress={handleLogout}
              style={styles.logoutButton}
              leftIcon={
                <Icon family="MaterialIcons" name="logout" size={20} color={theme.colors.surface} />
              }
            >
              Sair da Conta
            </Button>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}

export default Profile;
