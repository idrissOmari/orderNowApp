package fr.omatech.ordernow.service.mapper;


import fr.omatech.ordernow.domain.*;
import fr.omatech.ordernow.service.dto.ProductOrderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProductOrder} and its DTO {@link ProductOrderDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class, OrderMapper.class})
public interface ProductOrderMapper extends EntityMapper<ProductOrderDTO, ProductOrder> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "order.id", target = "orderId")
    ProductOrderDTO toDto(ProductOrder productOrder);

    @Mapping(source = "productId", target = "product")
    @Mapping(source = "orderId", target = "order")
    ProductOrder toEntity(ProductOrderDTO productOrderDTO);

    default ProductOrder fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProductOrder productOrder = new ProductOrder();
        productOrder.setId(id);
        return productOrder;
    }
}
