package fr.omatech.ordernow.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link fr.omatech.ordernow.domain.ProductOrder} entity.
 */
public class ProductOrderDTO implements Serializable {
    
    private Long id;

    private Integer quantity;


    private Long productId;

    private Long orderId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProductOrderDTO productOrderDTO = (ProductOrderDTO) o;
        if (productOrderDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productOrderDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductOrderDTO{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", productId=" + getProductId() +
            ", orderId=" + getOrderId() +
            "}";
    }
}
