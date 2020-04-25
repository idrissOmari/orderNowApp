package fr.omatech.ordernow.service.mapper;


import fr.omatech.ordernow.domain.*;
import fr.omatech.ordernow.service.dto.ProductDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Product} and its DTO {@link ProductDTO}.
 */
@Mapper(componentModel = "spring", uses = {MenuCategoryMapper.class, FormulaMapper.class})
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {

    @Mapping(source = "menuCategory.id", target = "menuCategoryId")
    @Mapping(source = "formula.id", target = "formulaId")
    ProductDTO toDto(Product product);

    @Mapping(source = "menuCategoryId", target = "menuCategory")
    @Mapping(source = "formulaId", target = "formula")
    @Mapping(target = "listFormulas", ignore = true)
    @Mapping(target = "removeListFormula", ignore = true)
    Product toEntity(ProductDTO productDTO);

    default Product fromId(Long id) {
        if (id == null) {
            return null;
        }
        Product product = new Product();
        product.setId(id);
        return product;
    }
}
