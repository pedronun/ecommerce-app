import { Layout } from '@components/Layout/Layout';
import { useUser } from '@contexts/UserContext/useUser';
import { Button, Icon, Input, Text } from '@design-system/components';
import { useTheme } from '@design-system/theme/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '@typings/navigation';
import { isValidEmail } from '@utils/validators';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getLoginStyles } from './Login.styles';

function Login() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getLoginStyles(theme, insets);
  const { login, isAuthPending } = useUser();
  const navigation = useNavigation<AppNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });

  const handleLogin = async () => {
    setErrors({ email: '', password: '', general: '' });

    let hasError = false;
    const newErrors = { email: '', password: '', general: '' };

    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
      hasError = true;
    } else if (!isValidEmail(email)) {
      newErrors.email = 'E-mail inválido';
      hasError = true;
    }

    if (!password.trim()) {
      newErrors.password = 'Senha é obrigatória';
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(email, password);
      navigation.navigate('Tabs', { screen: 'Profile' });
    } catch {
      setErrors({
        email: '',
        password: '',
        general: 'E-mail ou senha incorretos. Tente novamente.',
      });
    }
  };

  return (
    <Layout>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentWrapper}>
            <View style={styles.logoContainer}>
              <View style={styles.logoIconWrapper}>
                <Icon
                  family="MaterialIcons"
                  name="shopping-cart"
                  size={40}
                  color={theme.colors.primary}
                />
              </View>
              <Text variant="h1" style={styles.title}>
                Bem-vindo
              </Text>
              <Text variant="body1" style={styles.subtitle}>
                Faça login para continuar
              </Text>
            </View>

            {errors.general && (
              <View style={styles.errorContainer}>
                <Text variant="caption" style={styles.errorText}>
                  {errors.general}
                </Text>
              </View>
            )}

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Input
                  label="E-mail"
                  placeholder="seu@email.com"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) {
                      setErrors({ ...errors, email: '' });
                    }
                  }}
                  error={errors.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  leftIcon={
                    <Icon
                      family="MaterialIcons"
                      name="email"
                      size={20}
                      color={errors.email ? theme.colors.error : theme.colors.text.secondary}
                    />
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Input
                  label="Senha"
                  placeholder="••••••••"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errors.password) {
                      setErrors({ ...errors, password: '' });
                    }
                  }}
                  error={errors.password}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  leftIcon={
                    <Icon
                      name="lock"
                      size={20}
                      color={errors.password ? theme.colors.error : theme.colors.text.secondary}
                    />
                  }
                  rightIcon={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Icon
                        name={showPassword ? 'visibility-off' : 'visibility'}
                        size={20}
                        color={theme.colors.text.secondary}
                      />
                    </Pressable>
                  }
                />
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  fullWidth
                  onPress={handleLogin}
                  loading={isAuthPending}
                  disabled={isAuthPending}
                >
                  Entrar
                </Button>
              </View>
            </View>

            <View style={styles.registerContainer}>
              <Text variant="body1" style={styles.registerText}>
                Não tem uma conta?
              </Text>
              <Pressable onPress={() => navigation.navigate('SignIn')}>
                <Text variant="body1" style={styles.registerLink}>
                  Cadastre-se
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
}

export default Login;
