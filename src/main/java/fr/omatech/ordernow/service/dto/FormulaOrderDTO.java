package fr.omatech.ordernow.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the {@link fr.omatech.ordernow.domain.FormulaOrder} entity.
 */
public class FormulaOrderDTO implements Serializable {
    
    private Long id;

    private Integer quantity;

    private Set<ProductDTO> listProducts = new HashSet<>();

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

    public Set<ProductDTO> getListProducts() {
        return listProducts;
    }

    public void setListProducts(Set<ProductDTO> products) {
        this.listProducts = products;
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

        FormulaOrderDTO formulaOrderDTO = (FormulaOrderDTO) o;
        if (formulaOrderDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), formulaOrderDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FormulaOrderDTO{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            ", listProducts='" + getListProducts() + "'" +
            ", orderId=" + getOrderId() +
            "}";
    }
}
