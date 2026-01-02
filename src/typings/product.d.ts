export interface Category {
  id: number;
  name: string;
  image?: string;
  creationAt?: string;
  updatedAt?: string;
  slug: string;
}

export interface Product {
  /**
   * Identificador único do produto (auto-gerado)
   */
  id: number;

  /**
   * Nome do produto
   */
  title: string;

  /**
   * Preço do produto
   */
  price: number;

  /**
   * Descrição do produto
   */
  description: string;

  /**
   * Objeto contendo informações da categoria (auto-populado)
   */
  category: Category;

  /**
   * Lista de URLs das imagens do produto
   */
  images: string[];

  /**
   * Versão URL-friendly do título (auto-gerado)
   */
  slug: string;

  /**
   * Timestamp de criação (auto-gerado)
   */
  creationAt: string;

  /**
   * Timestamp da última atualização (auto-gerado)
   */
  updatedAt: string;
}

/**
 * Tipagem para criação de produto
 * Contém apenas os campos obrigatórios para criação
 */
export interface CreateProductDTO {
  /**
   * Nome do produto
   */
  title: string;

  /**
   * Preço do produto
   */
  price: number;

  /**
   * Descrição do produto
   */
  description: string;

  /**
   * ID da categoria do produto
   */
  categoryId: number;

  /**
   * Lista de URLs das imagens do produto
   */
  images: string[];
}

/**
 * Tipagem para atualização de produto
 * Todos os campos são opcionais
 */
export interface UpdateProductDTO {
  /**
   * Nome do produto
   */
  title?: string;

  /**
   * Preço do produto
   */
  price?: number;

  /**
   * Descrição do produto
   */
  description?: string;

  /**
   * ID da categoria do produto
   */
  categoryId?: number;

  /**
   * Lista de URLs das imagens do produto
   */
  images?: string[];
}
